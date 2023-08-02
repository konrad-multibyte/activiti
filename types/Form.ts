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
    static tabIndex = 1

    constructor (title: string) {
        this.id = `tab${Tab.tabIndex}`
        this.title = title
        Tab.tabIndex++
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

    constructor (o: object) {
        Object.assign(this, o)
    }

    getFieldsIds () {
        return this.fields.map(field => field.id)
    }
}

export class EditorJson {
    tabs: Tab[]
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

    constructor () {
        this.tabs = []
        this.fields = []
    }
}

export default class Form {
    referenceId: number | null | undefined
    name: string
    description: string | null | undefined
    editorJson: EditorJson

    constructor (name: string) {
        this.name = name
        this.description = ''
        this.editorJson = new EditorJson()
    }
}
