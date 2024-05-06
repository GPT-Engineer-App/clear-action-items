import { useState } from 'react';
import { Box, Button, Container, Flex, IconButton, Input, List, ListItem, Text, useToast, VStack } from '@chakra-ui/react';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'Cannot add empty task.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input }]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id, newText) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, text: newText } : task));
  };

  return (
    <Container maxW="container.md" p={4}>
      <VStack spacing={4} align="stretch">
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="2xl" fontWeight="bold">Todo App</Text>
          <Button onClick={() => toast({
            title: 'Feature not implemented yet.',
            description: "This button will handle future features.",
            status: 'info',
            duration: 2000,
            isClosable: true,
          })}>More Features</Button>
        </Flex>
        <Flex>
          <Input placeholder="Add a new task" value={input} onChange={(e) => setInput(e.target.value)} />
          <IconButton icon={<FaPlus />} colorScheme="blue" onClick={addTask} aria-label="Add task" ml={2} />
        </Flex>
        <List spacing={3}>
          {tasks.map(task => (
            <ListItem key={task.id} d="flex" justifyContent="space-between" alignItems="center">
              <Text flex="1">{task.text}</Text>
              <IconButton icon={<FaEdit />} onClick={() => editTask(task.id, prompt('Edit task:', task.text))} aria-label="Edit task" />
              <IconButton icon={<FaTrash />} colorScheme="red" onClick={() => deleteTask(task.id)} aria-label="Delete task" />
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;