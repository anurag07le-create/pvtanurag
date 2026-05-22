git init
git config user.email "bot@example.com"
git config user.name "AI Bot"
git add .
git commit -m "Initial cinematic release"
git branch -M main
git remote remove origin 2>$null
git remote add origin https://github.com/anurag07le-create/pvtanurag.git
git push -u origin main
