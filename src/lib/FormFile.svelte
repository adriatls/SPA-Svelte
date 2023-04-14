<script lang="ts">
    import { StructureError } from "../ts/classes/StructureError"
    import type { IInfoFile } from "../ts/interfaces/IInfoFile"
    import { filterUniqueExtensions, validateData, validateFileStructure } from "../utils/DataValidations"
    import BoxForm from "./BoxForm.svelte"
    import Button from "./Button.svelte"
    import toast from 'svelte-french-toast'

    let fileInput: HTMLInputElement
    let jsonData: IInfoFile[] = new Array()
    let newData: IInfoFile[] = new Array()
    export let infoFilesData: IInfoFile[]
    export let onUpdateInfoFilesData: Function

    const handleFileUpload = (event: any) => {
        const reader = new FileReader()
        const file = event.target.files?.[0] ?? null
        if (file) {
            reader.onload = handleFileRead
            reader.readAsText(file, "UTF-8")
        }
    }

    const handleFileRead = (event: ProgressEvent<FileReader>) => {
        const content = event.target!.result as string
        try {
            jsonData = JSON.parse(content)
            validateFileStructure(jsonData)
        } catch (error) {
            const toastStyleConfig = 'font-family: Open Sans;font-style: normal; font-weight: 500; font-size: 16px; line-height: 160%; color: #2D2D2D; background-color: #FEE2E2'

            if (error instanceof StructureError) {
                toast.error(error.message, {
                    style: toastStyleConfig,
                    position: 'top-right'
                })
            } else {
                toast.error("An error occurred reading your file. Make sure your file follows JSON syntax and try again", {
                    style: toastStyleConfig,
                    position: 'top-right'
                })
            }      
            resetFileValues()
        }
    }

    const resetFileValues = () => {
        jsonData = []
        fileInput.value = ''
    }

    const handleSubmitFile = () => {
        const validDataFromFile = validateData(jsonData)
        const allData = [...infoFilesData, ...validDataFromFile]
        newData = filterUniqueExtensions(allData)
        const submit = new CustomEvent('updateInfoFilesData', {detail: newData})
        onUpdateInfoFilesData(submit);
        resetFileValues()
    }
</script>

<BoxForm title="Add data by importing JSON file" handleSubmitData={handleSubmitFile}>
    <div class="field">
        <label for="file">Choose a file</label>
        <input
            id="file"
            name="file"
            type="file"
            accept=".json"
            on:change={handleFileUpload}
            bind:this={fileInput}
            required
        />
    </div>
    <Button label="Import" type="submit"/>
</BoxForm>

<style>
.field {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
}
.field label {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 160%;
    color: #2D2D2D;
}
.field input {
    border: thin solid #2D2D2D;
    padding: 0px 8px;
    border-radius: 4px;
    color: #0056A8;
    background-color: #FFF;
    font-family: 'Open Sans';
    font-weight: 400;
    font-size: 14px;
    line-height: 160%;
    height: 40px;
    width: 80%;
}
#file::file-selector-button {
    font-weight: bold;
    color: #0056A8;
    background-color: rgba(0, 0, 0, 0.16);
    padding: 0.5em;
    border: none;
    border-radius: 4px 0px 0px 4px;
    height: 40px;
    cursor: pointer;
}
#file[type="file"] {
    padding: 0px 8px 0px 0px;
    width: 80%;
    cursor: pointer;
}
</style>