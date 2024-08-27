import React, { useState } from 'react'
import axios from 'axios'
import FormData from 'form-data'

const pinataApiKey = process.env.REACT_APP_PIN_FILE_TO_IPFS_KEY
const pinataSecretApiKey = process.env.REACT_APP_PIN_FILE_TO_IPFS_SECRET_KEY

const ImageToIPFS = () => {
    const [selectedFile, setSelectedFile] = useState(null)
    const [ipfsHash, setIpfsHash] = useState('')

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0])
    }

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Please select a file first.')
            return
        }

        const formData = new FormData()
        formData.append('file', selectedFile)

        try {
            const response = await axios.post(
                'https://api.pinata.cloud/pinning/pinFileToIPFS',
                formData,
                {
                    headers: {
                        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                        pinata_api_key: pinataApiKey,
                        pinata_secret_api_key: pinataSecretApiKey,
                    },
                }
            )
            setIpfsHash(response.data.IpfsHash)
        } catch (error) {
            console.error('Error uploading file to IPFS:', error)
        }
    }

    return (
        <div className="App">
            <h3>Upload Image to IPFS</h3>
            <input type="file" onChange={handleFileChange} />
            <br />
            <button style={{ marginTop: '30px' }} onClick={handleUpload}>
                Upload
            </button>
            {ipfsHash && <p>IPFS Hash: {ipfsHash}</p>}
        </div>
    )
}

export default ImageToIPFS
