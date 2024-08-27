import React, { useState } from 'react'
import axios from 'axios'

const pinFileToIPFS_Key = process.env.REACT_APP_PIN_FILE_TO_IPFS_KEY
const pinFileToIPFS_Secret_Key =
    process.env.REACT_APP_PIN_FILE_TO_IPFS_SECRET_KEY

const pinJSONToIPFS_Key = process.env.REACT_APP_PIN_JSON_TO_IPFS_KEY
const pinJSONToIPFS_Secret_Key =
    process.env.REACT_APP_PIN_JSON_TO_IPFS_SECRET_KEY

const ImageToJSONOnIPFS = () => {
    const [selectedFile, setSelectedFile] = useState(null)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [ipfsHash, setIpfsHash] = useState('')

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0])
    }

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }

    const handleUpload = async () => {
        if (!selectedFile || !name || !description) {
            alert('Please fill all fields and select a file.')
            return
        }

        const formData = new FormData()
        formData.append('file', selectedFile)

        try {
            // Upload image to IPFS
            const fileResponse = await axios.post(
                'https://api.pinata.cloud/pinning/pinFileToIPFS',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        pinata_api_key: pinFileToIPFS_Key,
                        pinata_secret_api_key: pinFileToIPFS_Secret_Key,
                    },
                }
            )
            console.log(
                'fileResponse.data.IpfsHash',
                fileResponse.data.IpfsHash
            )

            const imageUrl = `https://gateway.pinata.cloud/ipfs/${fileResponse.data.IpfsHash}`

            // Create JSON data with image URL
            const jsonData = {
                name,
                description,
                image: imageUrl,
            }

            // Upload JSON data to IPFS
            const jsonResponse = await axios.post(
                'https://api.pinata.cloud/pinning/pinJSONToIPFS',
                jsonData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        pinata_api_key: pinJSONToIPFS_Key,
                        pinata_secret_api_key: pinJSONToIPFS_Secret_Key,
                    },
                }
            )

            setIpfsHash(jsonResponse.data.IpfsHash)
        } catch (error) {
            console.error('Error uploading data to IPFS:', error)
        }
    }

    return (
        <div className="App">
            <h3 style={{ marginTop: '20px' }}>Upload Data to IPFS</h3>
            <input
                style={{ marginTop: '30px' }}
                type="text"
                placeholder="Name"
                value={name}
                onChange={handleNameChange}
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={handleDescriptionChange}
            />
            <input type="file" onChange={handleFileChange} />
            <br />
            <button style={{ marginTop: '30px' }} onClick={handleUpload}>
                Upload
            </button>
            {ipfsHash && <p>IPFS Hash: {ipfsHash}</p>}
        </div>
    )
}

export default ImageToJSONOnIPFS
