
export const Loader = ({ color = '' }) => {
    const dotColor = {
        backgroundColor: color ? color : '#fff',
    };
    return (
        <div className="flex justify-start items-center">
            <div className="typing-indicator">
                <div
                    style={{ ...dotColor }}
                    className={'typing-circle bg-white'}
                ></div>
                <div style={{ ...dotColor }} className="typing-circle"></div>
                <div style={{ ...dotColor }} className="typing-circle"></div>
                <div style={{ ...dotColor }} className="typing-shadow"></div>
                <div style={{ ...dotColor }} className="typing-shadow"></div>
                <div style={{ ...dotColor }} className="typing-shadow"></div>
            </div>
        </div>
    );
};
