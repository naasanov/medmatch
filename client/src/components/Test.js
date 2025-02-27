import { useState } from 'react';
import axios from 'axios';

function Test() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('Nothing to say yet');
    const [currID, setCurrID] = useState(null);

    function onFileChange(e) {
        setFile(e.target.files[0]);
    }

    async function onSubmit(e) {
        e.preventDefault();
        if (!file) {
            setMessage('No file selected')
        }

        const formData = new FormData();
        formData.append('file', file);
        setMessage('request sent')

        try {
            const res = await axios.post('http://localhost:4000/profiles/67067c463a5122c2dfa6271d/files/recommendations', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setCurrID(res.data.id);
            setMessage(`status: ${res.status}\nmessage: ${res.data}`);
        }
        catch(e) {
            setMessage(`status: ${e.response.status}\nmessage: ${e.response.data}`)
        }
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <div>
                    <input type="file" onChange={onFileChange} />
                </div>
                <button type="submit">Upload</button>
            </form>
            {message && <p>{message}</p>}
            {currID && <img src={`http://localhost:4000/files/${currID}`} alt={'test'} width="100%" />}

        </>
    )
}

export default Test;