// This function takes an events array, then uses map to create a new array with only locations
// It will also remove all duplicates by creating another new array using the spread opearator and spreading a new Set
export const extractLocations = (events) => {
    var extractLocations = events.map((event) => event.location);
    var locations = [...new Set(extractLocations)];
    return locations;
};