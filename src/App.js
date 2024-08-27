import './App.css'
import ImageToIPFS from './components/ImageToIPFS'
import ImageToJSONOnIPFS from './components/ImageToJSONOnIPFS'

function App() {
    return (
        <div>
            <h1 className="App">Upload Image To IPFS </h1>
            <ImageToIPFS />
            <h1 style={{ marginTop: '50px' }} className="App">
                Upload Image to IPFS then Create JSON and Upload to IPFS{' '}
            </h1>
            <ImageToJSONOnIPFS />
        </div>
    )
}

export default App
