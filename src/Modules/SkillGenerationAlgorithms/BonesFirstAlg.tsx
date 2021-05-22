import SeededRandom from "../../Utils/SeededRandom"
import { Aspect } from "../Aspect"
import { Interest } from "../Interest"
import { RPGClass } from "../RPGClass"
import { CoreSkill, Skill } from "../Skill"
import { all_themes, Theme } from "../Theme"
import { SkillGenAlg } from "./SkillGenAlg"

//generates the structure of the graph first, then fills it in
export   class  BonesFirstAlg extends SkillGenAlg{
    assignSkillChildren = (prop_skills: Skill[], root: Skill, rand: SeededRandom )=>{
        //TODO this might be irrelevant how this works.
    }

    assignChild =(parent: Skill, child: Skill)=>{
        console.log("JR NOTE: assigning child", child.name, "to parent", parent.name);
        child.parents.push(parent);
        parent.children.push(child);      
    }

    generateSkills = (class_name: RPGClass, aspect: Aspect, interests: Interest[], themes:Theme[], rand: SeededRandom)=>{
        console.log("JR NOTE: generating skills");

        /*
        "there are 8 nodes from "status".  for each node pick a single theme from the player and generate a skill.

        there are three nodes from "Summon Plant".  for each node generate a new skill that has plant as a theme and 0-1 others from the players theme list

        there is two nodes from "forest path". for each node, generate a new skill that has themes "plant" and "guide"
        */
        let ret:Skill[] = [];
        ret = this.generateRootAndBase(class_name, aspect, interests, rand);
        //okay so at this point we have the root and all the direct nodes leading from it.
        //now all thats left is to loop through all skills and generate children.

        //this should happen TWICE. ~MAYBE~ three times.
        //skip root for this. (slice)
        console.log("JR NOTE: after generate root and base ret is", ret)
        const tierTwo = this.generateTierTwo(ret.slice(1), themes, rand);
        console.log("JR NOTE: tier two is ", tierTwo)
        ret = ret.concat(tierTwo);
        
        console.log("JR NOTE: after generateTierTwo ret is", ret)

        const tierThree = this.generateTierTwo(tierTwo, themes, rand);
        console.log("JR NOTE: tier two is ", tierThree)
        ret = ret.concat(tierThree);
        
        console.log("JR NOTE: after generateTierThree ret is", ret)

        return this.only_leave_unique_names(ret);
    }

    // there are three nodes from "Summon Plant".  for each node generate a new skill that has plant as a theme and 0-1 others from the players theme list

    generateTierTwo = (skills: Skill[], themes: Theme[], rand: SeededRandom) =>{
        console.log("JR NOTE: generating tier 2");


        let ret:Skill[] = [];
        for(let i = 0; i<skills.length; i++){
            //combine a skill with its neighbor, loop if necessary
            const skill = skills[i];
            const second_skill = i<skills.length-1? skills[i+1]:skills[0];
            console.log("JR NOTE: combining", skill.name, "with", second_skill.name);
            const theme1 = all_themes[rand.getRandomElementFromArray(second_skill.theme_keys)];
            const theme2 = all_themes[rand.getRandomElementFromArray(skill.theme_keys)];

            if(theme1.key !== theme2.key){
                let tmp = (this.generate_skill_x_times(2,[theme1, theme2], rand));
                tmp = this.only_leave_unique_names(tmp);
                for(const new_skill of tmp){
                    //no doubles
                    if(ret.filter((s) =>s.name === new_skill.name).length ===0){
                        ret.push(new_skill);
                        this.assignChild(skill, new_skill);
                        this.assignChild(second_skill, new_skill);

                    }
                }

            }
        }
        return ret;
    }

    generateRootAndBase =(class_name: RPGClass, aspect: Aspect, interests: Interest[], rand: SeededRandom) =>{
        console.log("JR NOTE: generating root and base");
        const root = new CoreSkill("Status", 0, rand);
        const max = 3;
        const min = 1;
        let ret:Skill[] = [];

        for(const theme of class_name.themes ){
            ret = ret.concat(this.generate_skill_x_times(rand.getRandomNumberBetween(min,max),[theme], rand));
         }

        for(const theme of aspect.themes ){
            ret = ret.concat(this.generate_skill_x_times(rand.getRandomNumberBetween(min,max),[theme], rand));
        }

        for(const interest of interests){
            for(const interest_theme of interest.themes){
             ret = ret.concat(this.generate_skill_x_times(rand.getRandomNumberBetween(1,1),[interest_theme], rand));
            }
        }
        //important to do before assigning children
        ret = this.only_leave_unique_names(ret);
        for(const skill of ret){
            this.assignChild(root, skill);
        }
        ret.unshift(root);
        
        return ret;
    }

}