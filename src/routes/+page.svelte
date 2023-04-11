<script lang="ts">
    interface infoFile {
        extension: string,
        count: number,
        filesize: number,
    }

    let infoFile: infoFile = {
        extension: '',
        count: 0,
        filesize: 0.00
    }

    let infoFilesData: infoFile[] = new Array()

    const resetInputValues = () => {
        infoFile = {
            extension: '',
            count: 0,
            filesize: 0.00
        }
    }

    const handleSubmit = () => {
        infoFilesData = [...infoFilesData, infoFile]
        console.log(infoFilesData)
        resetInputValues()
    }

    const handleDelete = (extension: string) => {
        const filteredData = infoFilesData.filter(infoFilesData => infoFilesData.extension !== extension)
        infoFilesData = [...filteredData]
        console.log(infoFilesData)
    }
</script>

<form on:submit|preventDefault={handleSubmit}>
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

    <button type="submit">Add</button>
</form>
<table>
    <thead>
        <tr>
            <th>Extension</th>
            <th>Count</th>
            <th>Filesize</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
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
    </tbody>
</table>