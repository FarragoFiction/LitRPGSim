import SeededRandom from "../../Utils/SeededRandom";
import { Aspect } from "../Aspect";
import { Interest } from "../Interest";
import { RPGClass } from "../RPGClass";
import { CoreSkill, Skill } from "../Skill";
import { Theme } from "../Theme";
import { SkillGenAlg } from "./SkillGenAlg";

//JR NOTE: use this for waste glitches etc, a WRONG version of something familiar
export   class ShittyFirstVersion extends SkillGenAlg{

assignSkillChildren = (prop_skills: Skill[], root: Skill, rand: SeededRandom )=>{
    /*  
        do this non recursively. 
        while there are nodes without children and theres still children to go
        check all still unassigned children for assignmen to the current node
        if you find nothing, yeet it, else add the children for realsies.
    */
   const todo = [root];//remember to be FIFO about it, is a pretend queue
   let orphans: Skill[]  = [];
   orphans = prop_skills.sort((a,b) => a.tier < b.tier ? -1:1);

   const assignChild =(parent: Skill, child: Skill)=>{
       if(child === parent || child.parents.includes(parent) || parent.children.includes(child) || child.parents.length >=2)
       {
           return;
       }
       //i really don't want the early skills all linking to each other, thats pointless.
       if(child.theme_keys.length == 1 && parent.theme_keys.length == 1){
           return;
       }
       child.parents.push(parent);
       parent.children.push(child);
       todo.push(child);
       //JR NOTE: some are allowed to have multiple parents but mostly they don't
       if(child.parents.length >=2 || rand.nextDouble() <0.9){
           orphans.filter((skill)=> skill === child);
       }
   }

    //special case for root
    const assignSingleThemeChildren =(potential_parent:Skill,max_children:number)=>{
        if(potential_parent !== root){
            return;
        }
        for(const skill of orphans){
            if(skill.theme_keys.length === 1){
                //no limit, just grab ALL root skills plz
                assignChild(potential_parent, skill);
            }
        }  
    }

    const assignExactMatchChildren =(potential_parent:Skill, max_children:number)=>{
        //highest priority is exact matches (upgrades)
        for(const skill of orphans){
            //you can be my child if you match my themes exactly  
            if(skill.theme_keys.join("") == potential_parent.theme_keys.join("") && potential_parent.children.length <max_children){
                assignChild(potential_parent, skill);
            }
        }
    }

    const assignPartialMatchChildren =(potential_parent:Skill, max_children:number)=>{
         //secondary priority is 
        for(const skill of orphans){
            // you can be my child if you have however many themes but at least one of mine
            for(const key of potential_parent.theme_keys){
                if(skill.theme_keys.includes(key) && potential_parent.children.length <max_children){
                    assignChild(potential_parent, skill);
                }
            }
            
        }
    }

    const assignSpecialSkills = (potential_parent:Skill, max_children:number)=>{
        //okay at this point we're at a tip somewhere, so lets sprinkle in any other themeless skills we have here.
        for(const skill of orphans){
            if(skill.theme_keys.length == 0 && potential_parent.children.length <max_children){
                assignChild(potential_parent, skill);
            }
        }
    }

   while(todo.length >0 && orphans.length >0 ){
        const potential_parent = todo.shift()!;
        const max_children = rand.getRandomNumberBetween(1,3);
        assignSingleThemeChildren(potential_parent,max_children);
        assignExactMatchChildren(potential_parent,max_children);
        assignPartialMatchChildren(potential_parent,max_children);
        assignSpecialSkills(potential_parent,max_children);
   }



}


generateSkills = (class_name: RPGClass, aspect: Aspect, interests: Interest[], themes:Theme[], rand: SeededRandom)=>{
   let ret:Skill[] = [new CoreSkill("Status", 0)];
   const max = 7;
   const min = 3;


   for(const class_theme of class_name.themes ){
        ret = ret.concat(this.generate_skill_x_times(rand.getRandomNumberBetween(min,max),[class_theme], rand));
       for(const aspect_theme of aspect.themes ){
        ret = ret.concat(this.generate_skill_x_times(rand.getRandomNumberBetween(min,max),[aspect_theme], rand));
        ret = ret.concat(this.generate_skill_x_times(rand.getRandomNumberBetween(min,max),[aspect_theme, class_theme], rand));
       }
   }

   for(const interest of interests){
       for(const interest_theme of interest.themes){
        ret = ret.concat(this.generate_skill_x_times(rand.getRandomNumberBetween(min,max),[interest_theme], rand));
        for(const aspect_theme of aspect.themes ){
            ret = ret.concat(this.generate_skill_x_times(rand.getRandomNumberBetween(min,max),[aspect_theme, interest_theme], rand));
        }

        for(const class_theme of class_name.themes ){
           ret =  ret.concat(this.generate_skill_x_times(rand.getRandomNumberBetween(min,max),[class_theme, interest_theme], rand));
        }
       }
   }
   console.log("generate skill is about to return", ret)
   return this.only_leave_unique_names(ret);
}

}