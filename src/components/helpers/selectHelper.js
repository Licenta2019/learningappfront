export const mapOptions = (options) => {
    return options.map(option => { return { value: option.id, label: option.name } });
}

export const mapLabels = (labels) => {
    return labels.map(label => { return { value: label, label: label } });
}
