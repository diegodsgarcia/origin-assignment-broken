interface CarInfo {
    make: string
    model: string
    year: number
    trim: string
    vehicleType: string
}

interface VinResultEntry {
    Make: string
    Trim: string
    Model: string
    ModelYear: number
    VehicleType: string
}

interface VinCheckResponse {
    Results: VinResultEntry[]
}
