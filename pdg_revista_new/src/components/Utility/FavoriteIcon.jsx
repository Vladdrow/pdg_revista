const FavoriteIcon = ({ favoriteChecked, toggleFavorite }) => (
    <div className="icon-favorite" onClick={toggleFavorite}>
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24" className={`favorite ${favoriteChecked ? "checked": ""}`}>
            <path
                stroke="#a5862b"
                strokeWidth="2"
                fill="none"
                d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22Z"
            />
        </svg>
    </div>
);

// Asegúrate de exportar el componente si está en un archivo separado
export default FavoriteIcon;
