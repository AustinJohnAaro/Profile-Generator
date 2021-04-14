


let path = require("path");
let fs = require("fs");
let inquirer = require("inquirer"); 
const { start } = require("repl");

let templatesDir = path.resolve(__dirname, "../templates");


startBuldingTeam();
function startBuldingTeam(){
  console.log("Pleas bulid your team?")
  inquirer.prompt([
    {
      type:'input',
      name:'ManagerName',
      message:'What is your team managers name?',

    }
  ]).then(response =>{
    console.log(response)
  })
} 
let render = employees => {
     let html = [];

    html.push(...employees
         .filter(employee => employee.getRole() === "Manager")
        .map(manager => renderManager(manager))
     );
     html.push(...employees
        .filter(employee => employee.getRole() === "Engineer")
         .map(engineer => renderEngineer(engineer))
     );
     html.push(...employees
         .filter(employee => employee.getRole() === "Intern")
         .map(intern => renderIntern(intern))
    );

     return renderMain(html.join(""));

};
let Manager;
function setManager(){
    Manager = Manager;
}


console.log(Manager);

let renderManger = manager => {
    let template = fs.readFileSync(path.resolve(templatesDir, "manager.html"), "utf8");
    template = replacePlaceholders(template, "name", manager.getName());
    template = replacePlaceholders(template, "role", manager.getRole());
    template = replacePlaceholders(template, "email", manager.getEmail());
    template = replacePlaceholders(template, "id", manager.getId());
    template = replacePlaceholders(template, "officeNumber", manager.getOfficeNumber());
    return template;
};

let renderEngineer = engineer => {
    let template = fs.readFileSync(path.resolve(templatesDir, "engineer.html"), "utf8");
    template = replacePlaceholders(template, "name", engineer.getName());
    template = replacePlaceholders(template, "role", engineer.getRole());
    template = replacePlaceholders(template, "email", engineer.getEmail());
    template = replacePlaceholders(template, "id", engineer.getId());
    template = replacePlaceholders(template, "github", engineer.getGithub());
    return template;
};

let renderInter = intern => {
    let template = fs.readFileSync(path.resolve(templatesDir, "engineer.html"), "utf8");
    template = replacePlaceholders(template, "name", intern.getName());
    template = replacePlaceholders(template, "role", intern.getRole());
    template = replacePlaceholders(template, "email", intern.getEmail());
    template = replacePlaceholders(template, "id", intern.getId());
    template = replacePlaceholders(template, "school", intern.getSchool());
    return template;
};

const listProcesses = async (processes, flags) => {
  inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

  const answer = await inquirer.prompt([{
    name: 'processes',
    message: 'Running processes:',
    type: 'autocomplete',
    pageSize: 10,
    source: async (answers, input) => filterProcesses(input, processes, flags)
  }]);

  try {
    await fkill(answer.processes);
  } catch (_) {
    handleFkillError(answer.processes);
  }
}

const handleFkillError = async processes => {
  const suffix = processes.length > 1 ? 'es' : '';

  if (process.stdout.isTTY === false) {
    console.error(`Error killing process${suffix}. Try \`fkill --force ${processes.join(' ')}\``);
    process.exit(1); // eslint-disable-line unicorn/no-process-exit
  } else {
    const answer = await inquirer.prompt([{
      type: 'confirm',
      name: 'forceKill',
      message: 'Error killing process. Would you like to use the force?'
    }]);

    if (answer.forceKill === true) {
      await fkill(processes, {
        force: true,
        ignoreCase: true
      });
    }
  }
}



        const checkPalindrome = (string) => string == string.split('').reverse().join('');
 
        // function to check anagram //
        const checkAnagram = (w1, w2) => {
         
            const regularize = (word) => {
                return word.toLowerCase().split('').sort().join('').trim();
            }
         
            return regularize(w1) === regularize(w2);
        }
         
        module.exports = {checkPalindrome, checkAnagram};
        const sum = (vals) => {
        
          let sum = 0;
          
          vals.forEach((val) => {
              sum += val;
          });
          
          return sum;
      }
       
      const positive = (vals) => {
       
          return vals.filter((x) => { return x > 0; });
      }
       
      const negative = (vals) => {
       
          return vals.filter((x) => { return x < 0; });
      }
       
      module.exports = { sum, positive, negative };

      
       
       
      
       
      
      async function runEditor (editor, filename) {
        const args = []
        if (editor === 'vim') {
         args.push('+star') // start vim in insert mode
         args.push('+') // and on the last line
        }
        args.push(filename)
       
        const startStat = await stat(filename)
       
        const proc = spawn(editor, args, { stdio: 'inherit' })
        const startTime = Date.now()
        await new Promise((resolve, reject) => {
         proc.on('error', reject)
         proc.on('exit', () => resolve())
        })
       
        const endStat = await stat(filename)
        const hasSaved = endStat.mtime > startStat.mtime
       
        // If it exited really quickly without updating the file, it might have forked, and we should wait for the message to be written
        // (visual editors like VS Code like to do this)
        if (Date.now() - startTime < 2000 && !hasSaved) {
         const prompt = await inquirer.prompt({
          type: 'confirm',
          name: 'continue',
          message: 'Could not determine whether the editor is closed. Please type your message and save the file, and then press Y or Enter to continue. Press N to abort.',
          default: true
         })
       
         if (!prompt.continue) {
          throw new Error('Empty message--aborting Ask.')
         }
        }
       }










