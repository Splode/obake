import chalk from "chalk";

const top = `
    ...     :::::::.    :::.      :::  .   .,::::::  
 .;;;;;;;.   ;;;'';;'   ;;\`;;     ;;; .;;,.;;;;''''   
`;

const middle = `,[[     \\[[, [[[__[[\\. ,[[ '[[,   [[[[[/'   [[cccc   
$$$,     $$$ $$""""Y$$c$$$cc$$$c _$$$$,     $$""""   
`;

const bottom = `"888,_ _,88P_88o,,od8P 888   888,"888"88o,  888oo,__
  "YMMMMMP" ""YUMMMP"  YMM   ""\`  MMM "MMP" """"YUMMM
`;

const banner =
  chalk.blue(top) + chalk.blueBright(middle) + chalk.cyanBright(bottom);

export default banner;
