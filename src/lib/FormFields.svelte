<script lang="ts">
    import type { IInfoFile } from "../ts/interfaces/IInfoFile";
    import { filterUniqueExtensions, validateData } from "../utils/DataValidations";
    import BoxForm from "./BoxForm.svelte";
    import Button from "./Button.svelte";

    let newData: IInfoFile[] = new Array()
    export let infoFile: IInfoFile
    export let infoFilesData: IInfoFile[]
    export let onUpdateInfoFilesData: Function
    export let onCancelEdit: Function
    export let addOrSave: 'Add' | 'Save'

    console.log(addOrSave)

    const resetFieldsValues = () => {
        infoFile = {
            extension: '',
            count: 0,
            filesize: 0.00
        }
    }

    const handleSubmitFields = () => {
        const validData = validateData([infoFile])
        const allData = [...infoFilesData, ...validData]
        newData = filterUniqueExtensions(allData)
        const submit = new CustomEvent('updateInfoFilesData', {detail: newData})
        onUpdateInfoFilesData(submit);
        resetFieldsValues()
        cancelEdit()
    }

    const cancelEdit = () => {
        resetFieldsValues()
        const click = new CustomEvent('updateButtonLabel', {detail: 'Add'})
        onCancelEdit(click)
    }

</script>

<BoxForm 
    title={addOrSave === 'Add'
        ? "Add data by filling in the fields" 
        : "Edit data by changing the fields values"
    }
    handleSubmitData={handleSubmitFields}
>
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
    <div class="buttons">
        {#if addOrSave === 'Save'}
            <Button label={'Cancel'} type="button" clickHandler={() => cancelEdit()}/>
        {/if}
        <Button label={addOrSave} type="submit"/>
    </div>
</BoxForm >

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
.buttons {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
}
</style>