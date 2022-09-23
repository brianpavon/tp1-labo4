export interface Personajes {
    name:             string;
    alternate_names:  any[];
    species:          string;
    gender:           string;
    house:            string;
    dateOfBirth:      string;
    yearOfBirth:      number;
    wizard:           boolean;
    ancestry:         string;
    eyeColour:        string;
    hairColour:       string;
    wand:             Wand;
    patronus:         string;
    hogwartsStudent:  boolean;
    hogwartsStaff:    boolean;
    actor:            string;
    alternate_actors: any[];
    alive:            boolean;
    image:            string;
}

export interface Wand {
    wood:   string;
    core:   string;
    length: number;
}
