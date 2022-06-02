import React from 'react'

const Alert = (props) => {
    const capitalize = (word) => {
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        // <div className=' custom-alert mb-0 ' >
        //     {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
        //         <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
        //     </div>}
        // </div>
        <div className=''>
            {props.alert && <div className={`custom-alert alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>}
        </div>
    )

}
export default Alert