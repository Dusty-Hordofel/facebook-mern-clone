import PropagateLoader from 'react-spinners/PropagateLoader';

export default function ActivateForm({ type, header, text, loading }) {
  return (
    <div className="blur">
      <div className="popup">
        <div
          className={`popup_header ${
            type === 'success' ? 'success_text' : 'error_text'
          }`}
        >
          {/* {header} */}
          Olive
        </div>
        <div className="popup_message">
          {/* {text} */}
          Olivier 33
        </div>
        <PropagateLoader color="#1876f2" size={20} loading={loading} />
      </div>
    </div>
  );
}
