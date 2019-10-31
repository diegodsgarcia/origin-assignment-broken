export const fixtureFactory = <T>(defaults: T) => (params: Partial<T> = {}) =>
    (({ ...(defaults as any), ...(params as any) } as any) as T)

export const vinResultEntryFixture = fixtureFactory<VinResultEntry>({
    Make: "test",
    Trim: "test",
    Model: "test",
    ModelYear: 123,
    VehicleType: "test"
})

export const vinCheckResponseFixture = fixtureFactory<VinCheckResponse>({
    Results: []
})
