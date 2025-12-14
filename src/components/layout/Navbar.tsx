import React from 'react';
import { Box, Flex, Text, Link } from '@chakra-ui/react';

const Navbar = () => {
    return (
        <Box bg="teal.500" p={4}>
            <Flex align="center" justify="space-between">
                <Text color="white" fontSize="xl" fontWeight="bold">
                    DermaPlus
                </Text>
                <Flex>
                    <Link href="/" color="white" mx={2}>
                        Inicio
                    </Link>
                    <Link href="/contacto" color="white" mx={2}>
                        Contacto
                    </Link>
                    <Link href="/dashboard" color="white" mx={2}>
                        Dashboard
                    </Link>
                </Flex>
            </Flex>
        </Box>
    );
};

export default Navbar;