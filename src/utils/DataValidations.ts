import { StructureError } from "../ts/classes/StructureError";
import type { IInfoFile } from "../ts/interfaces/IInfoFile";

export const validateData = (data: IInfoFile[]) => {
    const validData: IInfoFile[] = data.filter(item => {
        const hasInfos = !!item.extension && Number.isInteger(item.count) && !Number.isNaN(item.filesize)
        if (hasInfos) {
            const hasValidExtension = item.extension.length >= 1 && item.extension.length <= 20
            const hasValidCount = item.count >= 0 && item.extension.length <= 9999
            const hasValidFilesize = item.count >= 0 && item.extension.length <= 1000000
            if (hasValidExtension && hasValidCount && hasValidFilesize) {
                return {
                    extension: item.extension,
                    count: item.count,
                    filesize: item.filesize
                }
            }
        }
    })
    return validData
}

export const filterUniqueExtensions = (newData: IInfoFile[]) => {
    const allNewExtensions = newData.map(item => item.extension)
    const uniqueExtensions = [...new Set(allNewExtensions)]

    const uniqueNewData: IInfoFile[] = new Array()
    for (let extension of uniqueExtensions) {
        const lastElement = newData.reduce((uniqueItems, item) => {
            if (item.extension === extension) {
                return item
            }
            return uniqueItems
        })
        uniqueNewData.push(lastElement)
    }
    return uniqueNewData
}

export const validateFileStructure = (content: any) => {
    if (!Array.isArray(content)) {
        throw new StructureError('The JSON file does not have an array')
    }

    for (const item of content) {
        if (typeof(item) !== 'object' || item === null) {
            throw new StructureError('The JSON file elements that are not objects')
        }
        if (!item.hasOwnProperty('extension') || typeof item.extension !== 'string') {
            throw new StructureError('The JSON file elements does not have extension property or extension is not a string')
        }
        if (!item.hasOwnProperty('count') || typeof item.count !== 'number') {
            throw new StructureError('The JSON file elements does not have count property or count is not a number')
        }
        if (!item.hasOwnProperty('filesize') || typeof item.filesize !== 'number') {
            throw new StructureError('The JSON file elements does not have filesize property or filesize is not a number')
        }
    }
}