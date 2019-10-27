import { get } from "../utils/https"

enum Infos {
    CHARS_EXPECTED = "17 chars expected",
    VIN_LENGTH = 17
}

const invalidChars = new RegExp(/[IOQa-z]+/, "g")

export const filter = (vin: string) =>
    vin
        .trim()
        .toUpperCase()
        .substring(0, Infos.VIN_LENGTH)
        .replace(invalidChars, "")

export const validate = (_vin: string): string => {
    if (_vin.length !== Infos.VIN_LENGTH) {
        return Infos.CHARS_EXPECTED
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
