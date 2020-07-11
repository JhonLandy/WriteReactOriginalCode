function  creatElement(type, config, ...children) {
    const props = {
        ...config,
        children: children.map(child => (typeof child === 'object' ? child : creatTextNode(child)))
    }

    return {
        type,
        props
    }
}


function creatTextNode(text) {
    return {
        type: 'TEXT',
        children: [],
        nodeValue: text
    }
}
export default {
    creatElement
}