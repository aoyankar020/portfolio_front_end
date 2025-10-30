async function Project({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <h1>single Project : {id} </h1>;
}

export default Project;
