import { Food } from "./food";

export interface int_Food {
    food: Food,
    prob: number, // DEFINES HOW BIG THE CHANCE OF EATING IS IF FOOD IS AVAILIBLE, from 0 (never) to 1 (always)
    freq: number, // DEFINES HOW OFTEN THE ANIMAL EATS, from (every step) to however big, every xt step (f.e 5, every fifth step)
    min_req: number, // DEFINES HOW OFTEN ANIMAL HAS TO EAT IN ORDER TO SURVIVE (5 would mean every fifth step one successfull try, else death)
    freq_timer: number, // TIMER FOR freq
}

export class Animal extends Food {
    food: int_Food[]; 

    constructor (id: string, food: int_Food[]) {
        super(id)
        this.food = food;
    }


    /**
      * EAT
    */
    public eat (entities: Animal[]) {
        let eat: number[] = [];
        this.food.forEach(element => {
            let eaten: boolean = false;
            if (element.freq_timer >= element.freq) {
                entities.forEach((entity, entity_index) => {
                    if (entity.id === element.food.id && eaten === false && Math.random() < element.prob) {
                        eat.push(entity_index);
                        eaten = true;
                    }
                });
            } else {
                element.freq_timer++;
            }         
        })

        eat.sort(function(a, b){return b-a}).forEach(index => {
            entities.slice(index, index+1);
        });

        return entities;
    }


    public die () {
        this.food.forEach(element => {
            if (element.min_req < element.freq_timer) {
                return true;
            }
        })
        return false;
    }
}