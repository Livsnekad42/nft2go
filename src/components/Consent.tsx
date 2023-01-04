import React from 'react';
import {useTranslation} from "react-i18next";

const Consent = () => {
    const { t } = useTranslation();

    return (
        <>
            <div className="container">
                <p>{t('Terms1')}</p>
            </div>
        </>
    )
};

export default Consent;
