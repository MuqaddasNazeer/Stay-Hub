import React, { useState } from 'react';
import FadeLoader from 'react-spinners/FadeLoader';

function Loading() {
    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    };

    const [loading, setLoading] = useState(true);

    return (
        <div>
            <div className="sweet-loading text-center">
                <FadeLoader

                    color='#000'
                    loading={loading}
                    css={override}
                    size={40}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        </div>
    );
}

export default Loading;
