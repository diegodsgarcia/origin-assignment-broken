import { get } from "../utils/https"

const invalidChars = new RegExp(/[IOQa-z]+/, "g")

export const filter = (vin: string) =>
    vin
        .trim()
        .toUpperCase()
        .substring(0, 17)
        .replace(invalidChars, "")

export const validate = (_vin: string): string => {
    if (_vin.length !== 17) {
        return "17 character expected"
    }
}

export const convert = ({ Results }: VinCheckResponse): CarInfo => {
    const [{ Make, Trim, Model, ModelYear, VehicleType }] = Results
    return {
        make: Make,
        trim: Trim,
        model: Model,
        year: ModelYear,
        vehicleType: VehicleType
    }
}

export const apiCheck = async (_vin: string): Promise<CarInfo> => {
    const url = `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${_vin}?format=json`
    return get(url).then((results: VinCheckResponse) => convert(results))
}
