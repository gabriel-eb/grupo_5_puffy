import React from 'react';

function Page(props) {
    const id = props.match.params.id
    return <h1>Page ID: {id}</h1>
}

export default Page;