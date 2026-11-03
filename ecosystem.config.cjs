// pm2: pm2 start ecosystem.config.cjs && pm2 save
// Сервер с 2 ГБ RAM: ограничиваем heap Next и перезапускаем процесс,
// если он всё-таки разрастётся, вместо того чтобы съедать всю память
module.exports = {
  apps: [
    {
      name: 'vzakone-front',
      cwd: __dirname,
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      node_args: '--max-old-space-size=512',
      max_memory_restart: '700M',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
