export default function ModalConfirmacion({ visible, mensaje, onConfirm, onCancel, soloConfirmar = false }) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50 transition-all duration-300">
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full transform scale-95 animate-fadeIn transition">
        <h2 className="text-xl font-semibold mb-4">{mensaje}</h2>
        <div className="flex justify-end gap-3">
          {!soloConfirmar && (
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
            >
              Cancelar
            </button>
          )}
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-[#4f772d] text-white rounded hover:bg-[#3d5a1f] transition"
          >
            {soloConfirmar ? "Aceptar" : "Sí, eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
}
