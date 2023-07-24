import { Document, ObjectId } from 'mongodb'

export class Outcomes {
    id: number | null | undefined
    name: string

    constructor (name: string) {
        this.name = name
    }
}

export class Tab {
    id: string | null | undefined
    title: string
    visibilityCondition: object | null | undefined

    constructor (title: string) {
        this.title = title
    }
}

export class FieldLayout {
    row!: number
    column!: number
    colspan!: number
}

export class Field {
    fieldType!: string
    id!: string
    name!: string
    type!: string
    value: object | null | undefined
    required!: boolean
    readOnly!: boolean
    overrideId!: boolean
    colspan!: number
    placeholder: object | null | undefined
    minLength!: number
    maxLength!: number
    minValue: object | null | undefined
    maxValue: object | null | undefined
    regexPattern: string | null | undefined
    optionType: object | null | undefined
    hasEmptyValue: object | null | undefined
    options: object | null | undefined
    restUrl: string | null | undefined
    restResponsePath: string | null | undefined
    restIdProperty: string | null | undefined
    restLabelProperty: string | null | undefined
    tab: string | null | undefined
    className: string | null | undefined
    dateDisplayFormat: string | null | undefined
    layout!: FieldLayout
    sizeX!: number
    sizeY!: number
    row!: number
    col!: number
    visibilityCondition: object | null | undefined
    numberOfColumns!: number
    // eslint-disable-next-line no-use-before-define
    fields!: Field[]
}

export class EditorJson {
    tabs!: Tab[]
    fields!: Field[]
    outcomes!: Outcomes[]
    javascriptEvents!: object[]
    classname: string | null | undefined
    style: string | null | undefined
    customFieldTemplates!: object
    metadata!: object
    variables!: object[]
    customFieldsValueInfo!: object
    gridsterForm!: boolean
}

export default class Form extends Document {
    _id: ObjectId
    referenceId: number | null | undefined
    name: string
    description: string | null | undefined
    editorJson: EditorJson

    constructor (_id: ObjectId, name: string, editorJson: EditorJson) {
        super()
        this._id = _id
        this.name = name
        this.editorJson = editorJson
    }
}
