package com.example.addressbook;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Service;

@Service
public class AddressService {

    private Map<String, Address> addresses = new HashMap<>();

    public Address save(Address address) {
        if (address.getId() == null) {
            address.setId(UUID.randomUUID().toString());
        }
        addresses.put(address.getId(), address);
        return address;
    }

    public List<Address> getAllAddresses() {
        return new ArrayList<>(addresses.values());
    }
}