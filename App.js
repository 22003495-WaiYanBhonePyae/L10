import React, { useState, useEffect } from 'react';
import { SectionList, StatusBar, Text, TextInput, View, StyleSheet } from 'react-native';

let originalData = [];

const App = () => {
    const [mydata, setMyData] = useState([]);

    useEffect(() => {
        fetch('https://mysafeinfo.com/api/data?list=hmstores&format=json&case=default')
            .then((response) => response.json())
            .then((myJson) => {
                if (originalData.length < 1) {
                    originalData = myJson;
                    setMyData([{ title: 'Store Locations', data: myJson }]); // Default section with all data
                }
            });
    }, []);

    const FilterData = (text) => {
        if (text) {
            const filteredData = originalData.filter((item) =>
                item.City.toLowerCase().includes(text.toLowerCase())
            );
            setMyData([{ title: 'Filtered Locations', data: filteredData }]);
        } else {
            setMyData([{ title: 'Store Locations', data: originalData }]);
        }
    };

    const renderItem = ({ item }) => {
        return (
            <View style={styles.card}>
                <Text style={styles.details}>Street Address: {item.StreetAddress}</Text>
                <Text style={styles.details}>City: {item.City}</Text>
                <Text style={styles.details}>State: {item.State.trim()}</Text>
                <Text style={styles.details}>Location: {item.Location}</Text>
            </View>
        );
    };

    const renderSectionHeader = ({ section: { title } }) => (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar />
            <Text style={styles.header}>Store Locations</Text>
            <TextInput
                style={styles.searchBar}
                placeholder="Search by city..."
                onChangeText={(text) => FilterData(text)}
            />
            <SectionList
                sections={mydata}
                renderItem={renderItem}
                keyExtractor={(item, index) => item.ID.toString() + index}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
        backgroundColor: '#002366',
        color: '#fff',
        padding: 10,
    },
    searchBar: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        margin: 10,
        padding: 10,
    },
    sectionHeader: {
        backgroundColor: '#002366',
        padding: 10,
        marginHorizontal: 10,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    sectionTitle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    card: {
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#ccc',
        marginHorizontal: 10,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
    },
    details: {
        fontSize: 14,
        color: '#555',
    },
});

export default App;
