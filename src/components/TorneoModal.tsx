import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { safeLocal } from "../utils/safeStorage";

const STORAGE_KEY = "torneo_popup_seen";
const WHATSAPP_PRIMARY =
  "https://wa.me/573178770506?text=Hola,%20deseo%20obtener%20m%C3%A1s%20informaci%C3%B3n%20e%20inscribirme%20al%20Torneo%20GEOTIG";
const WHATSAPP_SECONDARY =
  "https://wa.me/573146034018?text=Hola,%20deseo%20obtener%20m%C3%A1s%20informaci%C3%B3n%20e%20inscribirme%20al%20Torneo%20GEOTIG";

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function TorneoModal() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  // Mostrar una sola vez (persistente en localStorage)
  useEffect(() => {
    if (safeLocal.getItem(STORAGE_KEY)) return;
    const t = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(t);
  }, []);

  const close = useCallback(() => {
    safeLocal.setItem(STORAGE_KEY, "1");
    setClosing(true);
    setTimeout(() => setVisible(false), 320);
  }, []);

  // ESC para cerrar + bloqueo de scroll del fondo
  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [visible, close]);

  if (!visible) return null;

  return (
    <>
      <style>{`
        .torneo-overlay {
          position: fixed; inset: 0; z-index: 9999;
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          animation: torneoOverlayIn 0.3s ease forwards;
        }
        .torneo-overlay.closing { animation: torneoOverlayOut 0.3s ease forwards; }
        @keyframes torneoOverlayIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes torneoOverlayOut { from { opacity: 1 } to { opacity: 0 } }

        .torneo-card {
          position: relative;
          width: 100%;
          max-width: 448px;
          max-height: 92vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border-radius: 20px;
          background: #050a16;
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.65);
          animation: torneoCardIn 0.35s cubic-bezier(0.34, 1.3, 0.64, 1) forwards;
        }
        .torneo-card.closing { animation: torneoCardOut 0.3s ease forwards; }
        @keyframes torneoCardIn  { from { opacity: 0; transform: scale(0.92) translateY(18px) } to { opacity: 1; transform: scale(1) translateY(0) } }
        @keyframes torneoCardOut { from { opacity: 1; transform: scale(1) translateY(0) } to { opacity: 0; transform: scale(0.96) translateY(10px) } }

        .torneo-media {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex: 0 1 auto;
          min-height: 0;
          overflow: hidden;
          background: #050a16;
        }
        .torneo-media img {
          display: block;
          width: 100%;
          max-height: 58vh;
          object-fit: contain;
        }

        .torneo-actions {
          flex: 0 0 auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 16px 18px 18px;
          background: #0b1220;
        }

        .torneo-cta {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          width: 100%;
          padding: 14px 20px;
          border-radius: 14px;
          background: #25D366;
          color: #fff;
          font-weight: 700;
          font-size: 15px;
          text-decoration: none;
          box-shadow: 0 8px 24px rgba(37, 211, 102, 0.35);
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .torneo-cta:hover {
          background: #1eb855;
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(37, 211, 102, 0.45);
        }
        .torneo-cta:active { transform: translateY(0); }

        .torneo-cta-secondary {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          width: 100%;
          padding: 10px 16px;
          border-radius: 12px;
          background: transparent;
          border: 1px solid rgba(37, 211, 102, 0.4);
          color: rgba(255, 255, 255, 0.8);
          font-weight: 600;
          font-size: 13px;
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .torneo-cta-secondary:hover {
          background: rgba(37, 211, 102, 0.12);
          border-color: rgba(37, 211, 102, 0.7);
          color: #fff;
        }

        .torneo-close {
          position: absolute; top: 12px; right: 12px; z-index: 2;
          display: flex; align-items: center; justify-content: center;
          width: 36px; height: 36px;
          border: none; cursor: pointer;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.55);
          color: #fff;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          transition: background 0.2s, transform 0.2s;
        }
        .torneo-close:hover { background: rgba(0, 0, 0, 0.8); transform: scale(1.06); }

        @media (max-width: 480px) {
          .torneo-card { max-width: 94vw; }
          .torneo-media img { max-height: 48vh; }
          .torneo-cta { font-size: 14px; padding: 13px 16px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .torneo-overlay, .torneo-card, .torneo-overlay.closing, .torneo-card.closing {
            animation-duration: 0.01ms;
          }
        }
      `}</style>

      <div
        className={`torneo-overlay${closing ? " closing" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Torneo GEOTIG"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className={`torneo-card${closing ? " closing" : ""}`}>
          <button className="torneo-close" onClick={close} aria-label="Cerrar anuncio">
            <X size={18} />
          </button>

          {/* Imagen publicitaria */}
          <div className="torneo-media">
            <img
              src="/assets/images/torneo-geotig.jpg"
              alt="Torneo GEOTIG — inscripciones abiertas"
            />
          </div>

          {/* Acciones */}
          <div className="torneo-actions">
            <a
              className="torneo-cta"
              href={WHATSAPP_PRIMARY}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
              Inscribirse por WhatsApp (317 877 0506)
            </a>
            <a
              className="torneo-cta-secondary"
              href={WHATSAPP_SECONDARY}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
              Otro número: 314 603 4018
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
