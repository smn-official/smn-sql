module.exports = (request) => {
    return (name) => {
        if (name)
            return request.parameters[name]
                ? request.parameters[name].value
                : null;

        let out = {};
        for (let item in request.parameters)
            if (request.parameters[item].io == 2)
                out[item] = request.parameters[item].value;
        return out;
    }
}
