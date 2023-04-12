<script lang="ts">
    import Box from "$lib/BoxForm.svelte";
    import Button from "$lib/Button.svelte";
    import { StructureError } from "../ts/classes/StructureError";
    import type { IInfoFile } from "../ts/interfaces/IInfoFile";
    import { validateData, validateFileStructure } from "../utils/DataValidations";
    import toast, { Toaster } from 'svelte-french-toast'

    let infoFilesData: IInfoFile[] = new Array()
    
    let fileInput: HTMLInputElement
    let jsonData: IInfoFile[] = new Array()

    let infoFile: IInfoFile = {
        extension: '',
        count: 0,
        filesize: 0.00
    }

    const resetFieldsValues = () => {
        infoFile = {
            extension: '',
            count: 0,
            filesize: 0.00
        }
    }

    const handleSubmitFields = () => {
        const validData = validateData([infoFile])
        infoFilesData = [...infoFilesData, validData[0]]
        resetFieldsValues()
    }

    const resetFileValues = () => {
        jsonData = []
        fileInput.value = ''
    }

    const handleSubmitFile = () => {
        const validDataFromFile = validateData(jsonData)
        infoFilesData = [...infoFilesData, ...validDataFromFile]
        resetFileValues()
    }

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

    const handleDelete = (extension: string) => {
        const filteredData = infoFilesData.filter(infoFilesData => infoFilesData.extension !== extension)
        infoFilesData = [...filteredData]
    }
</script>

<Toaster />

<form on:submit|preventDefault={handleSubmitFile}>
    <Box title="Add data by importing JSON file">
        <div class="field">
            <label for="file">Chose a file</label>
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
    </Box>
</form>

<form on:submit|preventDefault={handleSubmitFields}>
    <Box title="Add data by filling in the fields">
        <div class="field">
            <label for="extension">Extension</label>
            <input
                id="extension"
                name="extension"
                type="text"
                maxlength="20"
                minlength="1"
                placeholder="Ex: java, xml, ..."
                bind:value={infoFile.extension}
                required
            />
        </div>
        <div class="field">
            <label for="count">Count</label>
            <input
                id="count"
                name="count"
                type="number"
                min="0"
                max="9999"
                placeholder='0'
                bind:value={infoFile.count}
                required
            />
        </div>
        <div class="field">
            <label for="filesize">Filesize</label>
            <input
                id="filesize"
                name="filesize"
                type="number"
                min="0"
                max="1000000"
                step='0.01'
                placeholder='0.00'
                bind:value={infoFile.filesize}
                required
            />
        </div>
        <Button label="Add" type="submit"/>
    </Box>
</form>

<table class="table">
    <thead class="table-head">
        <tr>
            <th>Extension</th>
            <th>Count</th>
            <th>Filesize</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody class="table-body">
        {#if !infoFilesData.length}
            <tr>
                <td colspan="4">Add new data by importing it from a file or filling in the fields above!</td>
            </tr>
        {:else}
            {#each infoFilesData as infoFileData }
            <tr>
                <td>{infoFileData.extension}</td>
                <td>{infoFileData.count}</td>
                <td>{infoFileData.filesize}</td>
                <td>
                    <button
                        on:click={() => handleDelete(infoFileData.extension)}
                    >
                        Delete
                    </button>
                </td>
            </tr>
            {/each}
        {/if}
    </tbody>
</table>

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
    width: 300px;
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
    width: 308px;
    cursor: pointer;
}

.table {
    width: 81.55%;
    margin: auto;
    background: #F5F5F5;
    border-radius: 4px;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.16);
    border-collapse: collapse;
    font-family: 'Open Sans';
    font-style: normal;
    font-size: 14px;
    line-height: 160%;
    color: #2D2D2D;
}
.table-head {
    width: 100%;
    height: 48px;
    border-radius: 4px;
    border-bottom: 0.5px solid #DDDDDD;
    font-weight: 600;
}

.table-head th {
    width: 25%;
}
.table-body {
    width: 100%;
    background: #FFFFFF;
    font-weight: 400;
}
.table-body tr {
    height: 50px;
    text-align: center;
    border: 0.5px solid #DDDDDD;
}

</style>
