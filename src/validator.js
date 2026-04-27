const isValid = materials.every(item => {
  return (
    item.id && 
    item.title.length > 3 && // Название не может быть слишком коротким
    item.link.startsWith('http') // Ссылка должна быть похожа на ссылку
  );
});
