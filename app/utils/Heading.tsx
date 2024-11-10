
import React from 'react';

interface IHeadProps {
    title: string,
    description: string,
    keywords: string
}

const Heading = (props: IHeadProps) => {
    const { title, description, keywords } = props;
    return (
        <>
            <head>
                <link rel='icon' href='/assets/favicon.ico' type='image/x-icon' />
            </head>
            <title>{title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
        </>
    );
};

export default Heading;
