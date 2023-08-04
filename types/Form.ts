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

    constructor (o: object) {
        Object.assign(this, o)
    }
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
    fields: object | null | undefined = null

    constructor (o: object) {
        Object.assign(this, o)
        this.required = Boolean(this.required).valueOf()
        this.readOnly = Boolean(this.readOnly).valueOf()
        this.overrideId = Boolean(this.overrideId).valueOf()
        this.colspan = Number(this.colspan).valueOf()
        this.minLength = Number(this.minLength).valueOf()
        this.maxLength = Number(this.maxLength).valueOf()
        this.sizeX = Number(this.sizeX).valueOf()
        this.sizeY = Number(this.sizeY).valueOf()
        this.row = Number(this.row).valueOf()
        this.col = Number(this.col).valueOf()
    }
}

export class ContainerRepresentation extends Field {
    numberOfColumns: number
    fields: object | null | undefined = null

    constructor (o: object) {
        super(o)
        Object.assign(this, o)
        this.numberOfColumns = Number(this.numberOfColumns).valueOf()
        this.fields = {
            1: [],
            2: []
        }
    }
}

export class EditorJson {
    tabs: Tab[] = []
    fields: Field[] = []
    outcomes: Outcomes[] = []
    javascriptEvents: object[] = []
    className: string | null | undefined = ''
    style: string | null | undefined = ''
    customFieldTemplates: object = {}
    metadata: object = {}
    variables: object[] = []
    customFieldsValueInfo: object = {}
    gridsterForm!: boolean
}

export default class Form {
    id: number
    name: string
    description: string | null | undefined = ''
    version = 1
    lastUpdatedBy = 3
    lastUpdatedByFullName = 'Power User'
    lastUpdated: string
    stencilSetId: number
    formDefinition: EditorJson = new EditorJson()
    referenceId: number | null | undefined = null

    constructor (name: string) {
        this.id = Math.floor(Math.random() * 5000)
        this.name = name
        this.lastUpdatedByFullName = 'Power User'
        this.lastUpdated = '2023-08-01T12:02:08.680+0000'
        this.stencilSetId = 20020
    }
}
