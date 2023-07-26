import { useState } from 'react'
import styles from './styles.module.css'

const Download = () => {

    const [files, setFiles] = useState([])

    const [token, setToken] = useState('')

    const [upload, setUpload] = useState(false)


    const handleSelectFiles = (e) => {
        const files = e.target.files;
        const arrFiles = [...files].slice(0, 100);
        setFiles(arrFiles)
    }

    const handleSelectToken = (e) => {
        setToken(e.target.value)
    }



    const handleDownload = async () => {
        const text = document.querySelector('#text');
        text.style.display= 'block';
        for (const file of files) {
            const formData = new FormData();
            formData.append('file', file)

            await fetch('https://cloud-api.yandex.net/v1/disk/resources/upload', {
                method: 'POST',
                headers: {
                    Authorization: `${token}`
                },
                body: formData,
            })
            .then(response => {
                if(response.ok) {
                    setUpload(true)
                    console.log('succes')
                } else {
                    setUpload(false)
                    console.log('failed')
                }
            })
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Download your files</h1>
            <label className={styles.label}>
                <input className={styles.inputFiles} type='file' required onChange={handleSelectFiles} multiple placeholder='Select your files' />
                <input className={styles.inputToken} type='text' required={true} minLength='10' value={token} onChange={handleSelectToken}  placeholder='Input your token for YandexDisc'/>
                <button className={styles.button} onClick={handleDownload}>Download for Yandex</button>
            </label>
            <div className={styles.indicator} id='text'>
                {upload ? <span className={styles.uploadSucces}>Files upload successful</span> : <span className={styles.uploadFail}>Files upload failed</span>}
            </div>
        </div>
    )

}

export default Download
