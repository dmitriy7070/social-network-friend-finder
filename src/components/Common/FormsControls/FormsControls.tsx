import React from "react";
import { WrappedFieldProps } from "redux-form";
import classes from "./FormsControls.module.css"

// type TextAreaParamsType = {
// input: any
// meta: any
// }

// type TextAreaType = (params: TextAreaParamsType) => React.ReactNode

export const Textarea: React.FC<WrappedFieldProps> = ({ input, meta, ...props }) => {

    const hasError = meta.touched && meta.error;

    return (
        <div className={classes.formControl + " " + (hasError ? classes.error : " ")}>
            <div>
                <textarea {...input} {...props} />
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const Input: React.FC<WrappedFieldProps> = ({ input, meta, ...props }) => {

    const hasError = meta.touched && meta.error;

    return (
        <div className={classes.formControl + " " + (hasError ? classes.error : " ")}>
            <div>
                <input {...input} {...props} />
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
} 