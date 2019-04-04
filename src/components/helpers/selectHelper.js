export const mapOptions = (options) => {
    return options.map(option => { return { value: option.id, label: option.name } });
}
