import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown, Smartphone, HardDrive } from "lucide-react";
import { cn } from "@/lib/utils";

const PhoneDetails = ({ phoneData, updatePhoneData, nextStep, prevStep }) => {
  const [formData, setFormData] = useState({
    brand: phoneData.brand || '',
    model: phoneData.model || '',
    storage: phoneData.storage || '',
    imei: phoneData.imei || '',
    phoneNumber: phoneData.phoneNumber || '',
    batteryHealth: phoneData.batteryHealth || ''
  });

  const [brandOpen, setBrandOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [brandSearch, setBrandSearch] = useState('');
  const [modelSearch, setModelSearch] = useState('');

  const phoneDatabase = {
   Apple: [
  'iPhone 14', 'iPhone 14 Plus', 'iPhone 14 Pro', 'iPhone 14 Pro Max',
  'iPhone 15', 'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15 Plus',
  'iPhone 12 Pro Max', 'iPhone 12 Pro', 'iPhone 12', 'iPhone 12 Mini',
  'iPhone 16', 'iPhone 16 Plus', 'iPhone 16 Pro', 'iPhone 16 Pro Max',
  'iPhone 6s Plus', 'iPhone 6', 'iPhone 5S', 'iPhone 5C', 'iPhone 4',
  'iPhone 7', 'iPhone 8', 'iPhone X', 'iPhone XS Max', 'iPhone XS',
  'iPhone XR', 'iPhone SE', 'iPhone 3G', 'iPhone 3GS', 'iPhone 4S',
  'iPhone 5', 'iPhone 13 Pro Max', 'iPhone 13 Pro', 'iPhone 13', 'iPhone 13 mini',
  'iPhone 11 Pro Max', 'iPhone 11 Pro', 'iPhone 11', 'iPhone 13 Mini',
  'iPhone 15 Pro Max', 'iPhone 13 Pro Max', 'iPhone 13 Pro', 'iPhone 16e'
],

    Samsung: [
  'Galaxy Z Flip4 5G', 'Galaxy Z Flip4 5G Dual SIM', 'Galaxy S25', 'Galaxy F15',
  'Galaxy 25 5G', 'Galaxy A06', 'Galaxy S25 Ultra Dual SIM', 'Galaxy M53',
  'Galaxy A14 5G Dual SIM', 'Galaxy S24 FE', 'Galaxy A35 Dual SIM', 'Galaxy S25',
  'Galaxy S22 Ultra', 'Galaxy F54 5G', 'Galaxy M54 5G Dual SIM', 'Galaxy F34 5G Dual SIM',
  'Galaxy F55 5G Dual SIM', 'Galaxy M15 5G Dual SIM', 'Galaxy A52s 5G Dual SIM',
  'Galaxy A16 4G', 'Galaxy A73 5G', 'Galaxy A42 5G US Tracfone Wireless', 'Galaxy Z Fold6 Dual SIM',
  'Galaxy A55 5G', 'Galaxy Z Fold4 5G Dual SIM', 'Galaxy A24', 'Galaxy A24 Dual SIM',
  'Galaxy A35 5G Dual SIM', 'Galaxy A36 5G', 'Galaxy Z Fold6 Dual SIM', 'Galaxy S22',
  'Galaxy A42 5G Dual SIM', 'Galaxy S22 Ultra 5G', 'Galaxy A33 5G', 'Galaxy M54 5G',
  'Galaxy S23 5G', 'Galaxy S23 Dual SIM', 'Galaxy S23+', 'Galaxy Z Flip5', 'Galaxy M55 Dual SIM',
  'Galaxy A15 5G', 'Galaxy A52 Dual SIM', 'Galaxy A16 5G', 'Galaxy M53 5G Dual SIM',
  'Galaxy A13', 'Galaxy A23 5G', 'Galaxy S22 5G', 'Galaxy Z Flip4 5G Dual SIM', 'Galaxy M44',
  'Galaxy M35 5G Dual SIM', 'Galaxy S23 FE', 'Galaxy S23 Ultra Dual SIM', 'Galaxy A05s',
  'Galaxy M53 5G', 'Galaxy M53 5G Dual SIM', 'Galaxy A25 5G', 'Galaxy A36 5G', 'Galaxy M23',
  'Galaxy S23 Ultra 5G UW Premium Edition', 'Galaxy M55 5G Dual SIM', 'Galaxy A56 5G',
  'Galaxy S25 Ultra', 'Galaxy A14 5G', 'Galaxy S21 FE', 'Galaxy A33 5G Dual SIM', 'Galaxy M34',
  'Galaxy Z Flip5', 'Galaxy A25 Dual SIM', 'Galaxy A34 5G Dual SIM', 'Galaxy Z Fold6',
  'Galaxy A56 5G Dual SIM', 'Galaxy A16', 'Galaxy M14', 'Galaxy M33 Dual SIM'
],
 Google: [
    'Pixel 6a', 'Pixel 7', 'Pixel 7a', 'Pixel 7 Pro',
    'Pixel 8', 'Pixel 8a', 'Pixel 8 Pro',
    'Pixel 9', 'Pixel 9a', 'Pixel 9 Pro', 'Pixel 9 Pro XL',
    'Pixel Fold', 'Pixel 9 Pro Fold'
],

   OnePlus: [
  'Nord N30', 'Nord CE 3 Lite', 'Nord 11R 5G', 'Nord 12', 'Nord 9RT',
  'Ace 10 Pro', 'Ace 10T', 'Ace 10R', 'Ace Racing', 'Ace 3', 'Nord 3',
  '9RT Ace Pro', 'Nord 2T 5G', 'Nord N20 5G', 'Ace 2', 'Nord CE 2 Lite 5G',
  'Nord CE 3', 'Nord CE 3 Lite', '10R Open', 'Nord CE 4 Lite 5G'
],

   Xiaomi: [
  '12 Lite', 'M5s', 'Poco M5', 'Poco C55', 'Redmi Note 12 Pro 5G',
  'Note 14', 'K50', 'Mercedes-AMG PETRONAS Formula One Team Summer Edition',
  'Poco M4 5G', '12 Lite', 'K50i', 'Note 12 5G', '2 Pro', 'Note 14',
  'Note 13 Pro', '12C', 'K50', 'Redmi 10 2022', 'Poco C71', 'Poco M6 Plus 5G',
  '13 Pro', 'Mi Max Prime', '12T', 'POCO C65', 'POCO M6', 'K50i', 'Redmi 11 Prime',
  'Poco M6 Plus 5G', 'Redmi 12 5G', 'Redmi Note 13 Pro+ 5G', 'Redmi Note 13 Pro 5G',
  'Redmi Note 7', 'Note 7 Pro', 'Poco X4 GT', '13 Ultra', 'K50 Mercedes-AMG PETRONAS Formula One Team Summer Edition',
  '14 Pro', 'Redmi Note 11T Pro', 'Redmi Note 12 Pro+', 'Redmi Note 12 5G', '13T Pro',
  'Mi CC11', 'Note 11T 5G', 'Redmi Note 11T Pro', '12S', 'Mix Fold 3', 'Note 12 Speed Pro',
  'Poco F5 Pro', 'Poco X6 Pro', '11i HyperCharge', 'Black Shark 5 Pro', 'Note 12 Speed Pro',
  'POCO X5 5G', 'Redmi Note 12 Discovery', 'Redmi Note 14 Pro+', 'Redmi Note 14 Pro+ 12 5G',
  'Note 13 Pro', '11i HyperCharge', 'Note 11S', 'Redmi 12C', 'Redmi Note 12 Pro 5G',
  '14 Ultra', '14T', '10C', 'Redmi Note 12', '13T', 'Redmi Note 13 Pro+ 5G',
  'Redmi Note 13 Pro 5G', 'Note 13+', 'Redmi Note 14S', 'MIX Fold 2', 'Poco M6 Pro',
  '13 Pro', 'Note 13+', '2 Pro', 'Redmi Note 14 Pro', 'POCO F4 GT', 'Note 12T Pro',
  'Note 12 4G', 'Note 12 Turbo', 'Redmi Note 12 Pro+', '14', 'Redmi Note 8', 'Note 11E',
  'POCO F4 GT', 'MIX Fold 2', '13 Ultra', 'Redmi 12R', '14 Pro', 'Redmi Note 13',
  'Mi CC10', 'Note 14 Pro+', 'Note 14 Pro+', '9C', 'Redmi K50', 'Redmi K50', '12S Pro',
  '13 Lite', 'Note 12T Pro', 'Redmi Note 12 Pro 5G', 'Note 13 5G', 'POCO F6', '12',
  'Note 11 Pro 5G', 'Poco X4 Pro 5G', 'Redmi Note 11T Pro +', '12S Pro', 'Note 12 4G',
  '13 Ultra', 'K70', 'Redmi 13', 'Redmi Note 13 Pro 5G', 'K70', 'K80 Pro', 'Note 12T Pro',
  'Poco F4', 'Redmi K40S', 'Note 12 Turbo', 'Note 12 Turbo', 'Mix Flip', 'Poco X6 Pro',
  'POCO X6 Pro 5G', '14T Pro', 'K70 Ultra', 'K70 Ultra', '15 Pro', 'M7', 'Black Shark 5 Pro',
  'Poco X4 Pro 5G', 'Redmi Note 11T Pro +', 'Redmi K40S', 'Redmi 13C 5G', 'Redmi 13C 5G',
  '13T Pro', '13 Pro', 'Civi 4', 'Redmi Note 13 4G', '14T Pro', 'K80 Pro', 'Redmi K70 Pro',
  '14R', 'A3x', '12T', 'Redmi K50G', 'Redmi K50 Pro', '12S Pro', 'Note 12 Pro+ 5G',
  'Redmi 12', '14T', 'Note 13 Pro', 'Redmi Note 13 Pro Mix Flip', 'Poco X7 Pro',
  'Redmi Note 13R Pro', 'Redmi Note 14 5G', 'Redmi Note 14 Pro', 'Redmi Note 8 Pro',
  'Black Shark 5', '12S', '12T Pro', 'Civi 1S', 'Note 11 Pro 5G', 'Poco X4 Pro 5G',
  'Redmi 10 Prime 2022', 'Redmi Note 11 Pro 5G', 'Redmi Note 11E Pro', 'Redmi Note 11S 5G',
  '13 5G', 'Civi 3', 'POCO X5 Pro 5G', 'POCO X5 Pro 5G', 'Redmi Note 12 5G',
  'Redmi Note 12 Discovery', 'Civi 3', 'POCO F5', '15 Pro', 'Poco M7 Pro 5G', 'POCO X6 5G',
  'Redmi A3', 'Redmi Note 13 5G', 'Civi 4', 'Note 14 Pro 5G', 'Note 14 Pro+ 5G',
  'Redmi Note 14 5G', 'Redmi Note 7 Pro', 'Note 8 Pro', 'Note 14 Pro 5G', 'Note 14 Pro+ 5G',
  '12T Pro', 'Civi 1S', 'Note 12S', 'Redmi Note 11T Pro +', '13T Pro', 'K60E', 'Redmi 12 5G',
  'Redmi 12R', 'Redmi A2+', 'Civi 3', 'K60 Ultra', 'POCO C61', 'POCO F6', 'Poco M7 Pro 5G',
  'Redmi Note 13 5G', '14R', 'Redmi Note 8T', 'Mi CC11', 'Civi 2', 'POCO F4 Pro',
  'K60 Ultra', 'Poco M6 Pro', 'Redmi Note 12 5G', 'Redmi Note 12 Pro', 'Black Shark 5',
  'Civi 2', 'M4 Pro 5G', 'MIX Fold 2', 'Note 12S', 'Redmi Note 11E Pro', '12S Ultra',
  'C31', 'Note 12 Turbo', 'POCO M6 Pro', 'Redmi Note 14 Pro', 'K50', 'M4 Pro 5G',
  'Poco F4', 'Redmi Note 11 Pro 5G', 'Redmi Note 11E Pro', 'Redmi Note 8 Pro', 'Redmi K50G',
  'Redmi Note 11 Pro 5G', 'Redmi Note 11 Pro+', 'Redmi Note 11 Pro+ 5G', 'Poco M6',
  'K60 Pro', 'K60 Ultra', 'Poco F5 Pro', 'Redmi 13R 5G', 'Redmi 13R 5G', 'Redmi Turbo 3',
  '15', 'Redmi Note 11 Pro 5G', 'Redmi Note 11E', 'Redmi K50 Pro', 'Redmi K50 Pro',
  'Redmi Note 11 Pro+ 5G'
]
,
  Huawei: [
  'P60 Pro', 'P50 Pro', 'Mate 50 Pro', 'Nova 11', 'Y90', 'P40 Pro',
  'X60', 'Y9a', 'Y7a', 'P Smart 2021 Dual SIM', 'P50E', 'Honor 80',
  'Pura 70 Pro', 'Nova Y61', 'Mate XS 2', 'Mate XS 2', 'Mate 30 Lite',
  'Nova 12 Lite', 'Pura 70 Pro', 'Mate 50 RS Porsche Design', 'Enjoy 20 Pro Dual SIM',
  'Enjoy 70X', 'Enjoy 60X', 'Enjoy 60X', 'Pura 70', 'Enjoy 70X', 'Mate 30 Pro',
  'Nova 3', 'Nova 10 Youth', 'Nova 7 5G', 'Enjoy 20 Plus 5G', 'Nova 8 5G', 'Nova 13 Pro',
  'Nova 7 SE 5G', 'Enjoy 70S', 'Mate X5', 'Mate 50E', 'Nova 9 SE', 'Nova Y90',
  'P60 Pro/P60 Art', 'Nova 11', 'Nova 11', 'Enjoy 70X', 'Pocket 2', 'Pulse Mini',
  'Mate 50E', 'Nova 11 SE', 'Nova 12 Active', 'Nova 12 Lite', 'P Smart+/Nova 3i',
  'Pura 70', 'Mate XT Ultimate', 'Nova 10 Pro', 'Mate 60 Pro', 'P Smart Pro', 'Nova 11',
  'Mate 60', 'P50', 'Mate XT Ultimate', 'Enjoy 60', 'P40 Pro+', 'Pura 70', 'Nova 13',
  'Nova 12 Active', 'Nova 12 Lite', 'P30 Pro', 'Enjoy 70 Pro', 'Enjoy 70 Pro', 'Mate 50 Pro',
  'Nova 8', 'P50 Pro', 'Nova 12 Ultra', 'Mate X6', 'Nova 12 Pro', 'P60', 'Mate XT Ultimate',
  'Nova 12i', 'Nova 12 5G', 'Mate X5', 'Pura 70 Pro', 'Mate X3', 'Nova 12 5G', 'Mate 60',
  'P60 Pro', 'Nova 12 Lite', 'Pura 70 Pro+', 'PhotoVision', 'Mate 50', 'Nova 11 Pro',
  'Nova 12i', 'Nova 13', 'Mate 50', 'Mate 50', 'Nova 13', 'Mate X3', 'Mate X6', 'Smart Fusion',
  'Enjoy 60', 'P30 Lite', 'Mate 40', 'Nova 11 Pro', 'P60', 'Mate X6', 'Honor View 20',
  'Pocket 2', 'Mate 60', 'Enjoy 10e', 'Mate 60 Pro+', 'Nova 13 Pro', 'Pocket 2', 'Ascend P1',
  'Pocket S', 'Mate 60 Pro', 'P60 Pro', 'Nova 12 Ultra', 'Boulder', 'Pocket S', 'Mate X3',
  'Mate 60 Pro+', 'Pura 70 Pro+', 'Nova 10 Pro', 'Enjoy 70', 'Mate 50 Pro', 'Nova 13 Pro',
  'Honor 20i', 'Enjoy 70S', 'Nova 12 Pro', 'Enjoy 9s', 'Honor Magic6'
],
    Motorola : [
    'Hot 40 Pro', 'Edge 20', 'Edge 30 Neo', 'Edge 50 Fusion', 'Edge (2022)', 'Edge 30 Fusion',
    'Moto G 5G 2024', 'Moto G Stylus 5G (2024)', 'Moto G05', 'Moto G24', 'Moto G Power 5G 2024',
    'Moto G04', 'Moto G04s', 'Moto G15', 'Moto G34', 'Moto G34 5G', 'Moto G31', 'Moto G14',
    'Moto E22', 'Moto G Power 5G 2023', 'Moto G53', 'Edge 40 Neo', 'Edge X30', 'Moto G71 5G',
    'Moto G51 5G', 'Moto G54 5G', 'Edge 40', 'Moto G Stylus 5G (2022)', 'G Stylus (2022)',
    'Moto E22 2022', 'Moto G Stylus (2022)', 'One Zoom', 'Kiev21', 'Moto G Stylus 5G',
    'Moto G82 5G', 'Moto G62 5G', 'Moto G85 5G', 'Moto G Stylus (2023)', 'Razr (2023)',
    'Razr 5G', 'Moto G 5G 2023 2nd Gen', 'Moto G64 5G', 'Moto G200 5G', 'Moto G42',
    'Moto G52', 'One Vision', 'Edge+ 2023', 'Moto G35 5G', 'Edge (2022)', 'Moto G20',
    'Moto G22', 'Moto Z3 Play', 'Moto G10 Dual SIM', 'Edge 30 Pro', 'Moto G24 Power',
    'Moto Razr (2024)', 'Razr+ (2024)', 'Moto G60', 'Edge 50 Neo', 'P30 Play',
    'Moto G30', 'Moto Edge S30', 'Moto G32', 'Edge 50 Neo', 'Moto G50 Dual SIM',
    'Edge 40 Pro', 'Moto G84', 'Moto G40 Fusion', 'Moto G41', 'Moto G50',
    'Moto G (2022)', 'Razr+', 'Edge 2024'
],
Nubia : [
    'Z60 Ultra','Red Magic 7','Red Magic Mars', 'Focus 2 5G','Z17S','Red Magic 6R','N80','Z70 Ultra','Nord N30 SE'
],
Oppo : [
    'Nord CE4 Lite 5G', 'A2x', 'A60', 'Find X7', 'Oppo Reno 10', 'Find X6 Pro', 'Realme 1/A73s',
    'F21s Pro 5G', 'Find X7 Ace', 'Reno 11 Pro', 'A77s', 'A79', 'Find X5 Pro', 'Reno13',
    'A57 5G (2022)', 'A78 5G', 'Find N', 'Find X5 Lite', 'Reno 8 4G', 'Reno8 Lite 5G',
    'A2', 'K10x', 'Reno7 Z 5G', 'A76', 'Reno8 Pro Plus', 'A18', 'A98', 'Reno4', 'A5 Energy',
    'A55', 'A36', 'A3X 5G (China)', 'Reno5 A', 'Reno 11', 'Reno9', 'A57s', 'Find N2',
    'A3', 'A95 5G', 'K9', 'A1 5G', 'A35', 'K9x', 'A38', 'A55 5G', 'A93 5G', 'A9',
    'K10 Pro', 'K9 Pro', 'A56 5G', 'Reno 12', 'A54s', 'A93', 'A9x', 'Find X2', 'Reno 11F 5G',
    'F27 Pro+ 5G', 'Find N2 Flip', 'Reno10 Pro+', 'Reno 12 Pro 5G', 'A74 5G', 'K10 5G',
    'Find X', 'F11', 'A96 5G', 'A3 4G', 'A72 2020', 'A77', 'F17', 'K12x', 'Reno8 Z',
    'Ace 2 Pro', 'R9 Plusm A', 'A97', 'Find X2 Lite', 'Reno8 T', 'Reno8 T 5G', 'Find X6',
    'Reno9 A', 'A7x', 'A57e', 'F15', 'Reno8 Pro 5G', 'A3 Pro', 'Reno 12F 5G',
    'Reno8 5G', 'Reno8 Lite', 'GT3', 'Reno6 Pro 5G', 'Reno7 5G', 'Find X5', 'Realme 2 Pro',
    'Reno6', 'Reno6 Lite', 'Reno6 Pro+ 5G', 'Reno6 Z 5G', 'Reno7 SE', 'Find X2 Pro',
    'Reno7 Pro 5G', 'Reno4 SE', 'Reno Ace', 'Reno4 Pro 5G'
],
Realme: [
    'Q3 5G', '7 5G Dual SIM', 'GT2 Pro', 'GT Neo 6', '6i Global',
    'Q5', 'Q5 C53', 'Note 50', 'GT2 Explorer Master', '9i',
    '9 Pro Plus', '11 Pro', 'GT Neo 3', 'GT Neo3', 'X50m 5G',
    '5 Pro', 'Q5 Pro', 'Q5i', 'Narzo 50', 'Narzo 50 5G',
    'Narzo N53', 'X50 5G', 'P1 Pro 5G', 'Narzo 20 Pro Dual SIM', 'X2 Pro',
    'X50 Pro 5G', 'GTMaster Edition', 'Narzo 70 Pro 5G', '8i', 'C53 (India)',
    'Narzo 60', '12 Pro', '12+', '12 Pro+', 'C51',
    'C67', 'Narzo 50A', 'Narzo 60x', 'C53', 'Narzo 50 Pro',
    '8s 5G', '9i 5G', 'C51', 'C25s', 'V3 5G',
    '7i Dual SIM', 'GT Neo3', 'Narzo 50a Prime', 'Realme 8', 'V23',
    'C25Y', 'GT Neo3 150W', 'V11 5G', 'C25', 'X2',
    'GT Neo3', 'C15 2020 DS', '11x', '11 Pro+', 'Realme Q2 Pro 5G Dual SIM',
    'V50', 'C63', 'C75', 'C61', 'Note 60'
],
Redmi: [
    'K80', '14C', '14C Note', '14 5G Turbo', '4 Pro',
    'Note 14 5G', 'Note 14 Pro'
],
Vivo: [
    'iQOO Neo 8 Pro', 'X100', 'Y27', 'Y36', 'X90s', 'Y28',
    'V30', 'V50 Lite 5G', 'X Fold3 5G', 'X200 Pro mini', 'Y36 5G',
    'S17e', 'T2x 5G', 'Y78 Plus', 'S18', 'Y300 Pro+', 'X200 Pro',
    'S16', 'S19 Pro', 'S17', 'iQOO Neo9', 'V29 Lite', 'Y35+',
    'X100s 5G', 'iQOO Z7 Pro 5G', 'X90', 'Y78 5G', 'Y17S',
    'Z7 (5G)', 'iQOO Neo7 (China)', 'X100 Pro', 'Y200e 5G',
    'T2 Pro 5G', 'X90 Pro', 'X90 Pro+', 'Y200I', 'T2 5G',
    'V29', 'iQOO Neo 8', 'Y200 GT', 'S19', 'Y300 Pro',
    'iQOO Z9 Turbo 5G', 'S20', 'Y18', 'Y04', 'V30 Pro',
    'Y38 5G', 'T3x 5G', 'Z10 5G', 'Y29', 'X Fold3 Pro',
    'Z10 5G', 'Z9', 'Y19s', 'V29e 5G', 'Y28e 5G'
],
ZTE: [
    'Concord', 'Nubia Z40 Pro', 'S30 SE 5G', 'REDMAGIC 6 Pro',
    'Nubia Red Magic 7 Pro', 'A30 Pro', 'S40 5G', 'Axon 40 Ultra',
    'Nubia Red Magic 8 Pro', 'Blade A54', 'A30 Ultra+ 5G',
    'A31 Ultra+ 5G', 'Nubia Z40S Pro', 'Blade X1 5G',
    'Blade V30 Vita', 'Axon 7', '9100N', 'Blade A75 5G',
    'Blade A55'
],
HMD: [
    'Fusion', 'Skyline', 'Skyline Fusion', 'X20'
],
Honor: [
    'Magic 7 Pro', 'V40', 'Magic4', 'Play5', 'Youth', 'X6/X6s', 'X30i', 'V30 Pro 5G',
    'Magic Vs 5G Premium Edition', 'Magic4 Ultimate', 'Play5 Youth', 'X7a', 'Play4 5G',
    'V40 Lite', 'Magic4 Pro', 'X7c', 'X8c', 'X9c', 'X8a', 'X8b', 'X50 GT', '70 5G',
    'Play 30 Plus', 'Play 30', 'Play 40', 'X8b', 'Magic4', 'Magic5 Lite', 'Play 40 Plus',
    'Play 60 Plus', 'Magic4 Play', '9A', 'X7b', '90 Smart', 'X8a', 'X9 5G', 'X8 5G',
    'Magic V Flip 300', 'X50 GT 90', 'X50 GT', 'X6b', 'X8c', '100', 'Magic5 Pro', 'X40',
    'Honor 80 Pro', 'Magic V', 'X8', '50', '80 GT', 'Honor 80 Play', '30', '90 Pro',
    'HONOR X50I+', '70', '100', '100 Pro', 'Magic Vs 5G Premium Edition', 'X9', '70 Lite',
    '90 Smart', '50 Lite', '60 SE', '70 Pro', '90 GT', '9X Pro Dual SIM', 'Magic V2',
    '50', '80 GT', 'Honor 80', 'Magic V', '60', '60', '80', '30 Youth', '60 SE',
    'Magic6 Pro', '90 GT', 'Magic V Flip', 'Magic5', 'Magic5 Lite', 'Play 40 Plus', 'X50',
    '70', '20 Lite (Youth Edition)', '90 GT', 'Honor 80 SE', 'X40 GT', 'X7c', '90 Pro',
    'X9b', 'HONOR X50I+', '200 Lite', '70 5G', 'X7b', '100 Pro', 'X9A 5G', '70 Pro',
    'X50', 'Play5 5G', '80 Play 40', '90', '70 5G', 'Magic 7 Pro', '200 Smart', 'Play5 5G',
    'X10 Max 5G', '70 Pro Plus', 'X30 Max', '70', 'Magic6 Lite', 'X40', 'X50i', 'X6a',
    '50 Pro', 'Play4 Pro 5G Dual SIM', 'X9A 5G', 'Magic5', 'Magic 7 Pro', 'X6b', '90 Lite',
    '100 Pro', 'X50 Play', '60 Plus', 'Magic4 Pro', 'X9c', 'Smart View40 SE', '60 Pro',
    'X40i', 'X8b', 'X40i', 'Magic5 Pro', 'Magic V2', 'V30 Pro 5G', 'X9 5G', 'Magic V Flip',
    'Magic7 Lite 300', 'Pro Magic7 Lite', '200 300 Pro', '200', 'X5b', 'X60i', 'X5b Plus',
    'X60'
],
Infinix: [
    'Hot 50 Pro+', 'Hot 50 Pro 4G', 'Note 30', 'Note 12 (2023)', 'Smart 8 Pro', 'Zero X Pro',
    'Smart 8 Pro Zero', 'M Note 12 VIP', 'F60 5G', 'Zero 20', 'Note 12 G96', 'HOT 40i',
    'Hot 50i', 'Note 30', 'Hot 12 Pro', 'Hot 40 Pro', 'Zero X Pro', 'Hot 30 Play',
    'Note 12 Pro 5G', 'Note 12 Pro', 'NOTE 11', 'NOTE 11 Pro', 'Note 12i', 'HOT 30i',
    'Hot 12 Play NFC', 'Zero NEO 5G', 'Zero X', 'Zero 5G', 'HOT 20i', 'Hot 50 5G',
    'NOTE 11 S', 'Note 50 Pro', 'Hot 40'
],





  };

  const brands = Object.keys(phoneDatabase);
  const availableModels = formData.brand ? phoneDatabase[formData.brand] || [] : [];
  
  const storageOptions = [
    '32GB', '64GB', '128GB', '256GB', '512GB', '1TB'
  ];

  const filteredBrands = brands.filter(brand => 
    brand.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const filteredModels = availableModels.filter(model => 
    model.toLowerCase().includes(modelSearch.toLowerCase())
  );

  const handleInputChange = (field, value) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      if (field === 'brand' && value !== prev.brand) {
        newData.model = '';
        setModelSearch('');
      }
      return newData;
    });
  };

  const handleSubmit = () => {
    updatePhoneData(formData);
    nextStep();
  };

  const isFormValid = formData.brand && formData.model && formData.storage && 
                     formData.imei && formData.phoneNumber && formData.batteryHealth;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-800">Phone Details</h2>
        <p className="text-gray-600">Please provide your device information</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {/* Brand Combobox */}
          <div>
            <Label className="flex items-center gap-2 mb-2">
              <Smartphone className="h-4 w-4 text-blue-600" />
              Brand *
            </Label>
            <Popover open={brandOpen} onOpenChange={setBrandOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={brandOpen}
                  className="w-full justify-between px-4 py-3"
                >
                  {formData.brand || "Select brand..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput 
                    placeholder="Search brands..." 
                    value={brandSearch}
                    onValueChange={setBrandSearch}
                  />
                  <CommandList>
                    <CommandEmpty>No brand found.</CommandEmpty>
                    <CommandGroup className="max-h-60 overflow-y-auto">
                      {filteredBrands.map(brand => (
                        <CommandItem
                          key={brand}
                          value={brand}
                          onSelect={() => {
                            handleInputChange('brand', brand);
                            setBrandOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              formData.brand === brand ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {brand}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Model Combobox */}
          <div>
            <Label className="flex items-center gap-2 mb-2">
              <Smartphone className="h-4 w-4 text-blue-600" />
              Model *
            </Label>
            <Popover open={modelOpen} onOpenChange={setModelOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={modelOpen}
                  className="w-full justify-between px-4 py-3"
                  disabled={!formData.brand}
                >
                  {formData.model || 
                    (formData.brand ? "Select model..." : "Select brand first")}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput 
                    placeholder="Search models..." 
                    value={modelSearch}
                    onValueChange={setModelSearch}
                  />
                  <CommandList>
                    <CommandEmpty>No model found.</CommandEmpty>
                    <CommandGroup className="max-h-60 overflow-y-auto">
                      {filteredModels.map(model => (
                        <CommandItem
                          key={model}
                          value={model}
                          onSelect={() => {
                            handleInputChange('model', model);
                            setModelOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              formData.model === model ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {model}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Storage Dropdown */}
          <div>
            <Label className="flex items-center gap-2 mb-2">
              <HardDrive className="h-4 w-4 text-blue-600" />
              Storage Capacity *
            </Label>
            <Select value={formData.storage} onValueChange={(value) => handleInputChange('storage', value)}>
              <SelectTrigger className="px-4 py-3">
                <SelectValue placeholder="Select storage" />
              </SelectTrigger>
              <SelectContent>
                {storageOptions.map(storage => (
                  <SelectItem key={storage} value={storage}>{storage}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Right Column - Input Fields */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="imei">IMEI Number *</Label>
            <Input
              id="imei"
              value={formData.imei}
              onChange={(e) => handleInputChange('imei', e.target.value)}
              placeholder="15-digit IMEI number"
              className="mt-1"
              maxLength={15}
            />
          </div>

          <div>
            <Label htmlFor="phoneNumber">Phone Number *</Label>
            <Input
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              placeholder="Your phone number"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="batteryHealth">Battery Health *</Label>
            <Input
              id="batteryHealth"
              value={formData.batteryHealth}
              onChange={(e) => handleInputChange('batteryHealth', e.target.value)}
              placeholder="e.g., 85% or Good"
              className="mt-1"
            />
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <Card className="bg-blue-50 border-blue-200 p-4">
        <div className="text-sm text-blue-800">
          <strong>Data Storage:</strong> All diagnostic data is automatically saved with timestamps. 
          Records are retained for 3 months and each evaluation receives a unique receipt number for tracking.
        </div>
      </Card>

      <Card className="bg-yellow-50 border-yellow-200 p-4">
        <div className="text-sm text-yellow-800">
          <strong>Tip:</strong> You can find your IMEI by dialing *#06# on your phone or checking Settings → About Phone.
        </div>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <Button 
          onClick={prevStep}
          variant="outline"
          className="px-6 py-2"
        >
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-2"
        >
          Continue to Diagnostic
        </Button>
      </div>
    </div>
  );
};

export default PhoneDetails;