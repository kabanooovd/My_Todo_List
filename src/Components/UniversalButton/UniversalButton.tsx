import React from "react";


export const UniversalButton = ({
    buttonName,
    type
                                }: {
    buttonName: string
    type: 'submit'
}) => {

    const buttonStyle = {
        width: '200px',
        height: '40px',
        fontSize: '18px',
        color: 'snow',
        backgroundColor: 'blue',
        borderRadius: '4px',
        border: '1px solid blue',
        marginTop: '60px'
    }

    return (
        <button style={buttonStyle}
                type={type}
        >
            {buttonName}
        </button>
    )
}




