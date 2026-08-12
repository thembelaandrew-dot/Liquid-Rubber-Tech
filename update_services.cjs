const fs = require('fs');
let code = fs.readFileSync('src/pages/Services.tsx', 'utf8');

code = code.replace("        </div>\n      </div>\n      </section>", "        </div>\n      </section>");
fs.writeFileSync('src/pages/Services.tsx', code);
