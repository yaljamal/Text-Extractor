import React from 'react'

export const Form = ({ textLines, handleTextChange }) => {
    return (
        <form className="text-lines-form">
            {textLines.map((line, index) => (
                <div key={line.id} className="text-line">
                    <label htmlFor={`text-line-${index}`} className="text-line-label">
                        Line {index + 1}:
                    </label>
                    <input
                        id={`text-line-${index}`}
                        type="text"
                        value={line.text}
                        onChange={(event) => handleTextChange(index, event)}
                        className="text-line-input"
                    />
                </div>
            ))}
        </form>
    )
}
