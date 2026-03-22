# Voice Models Collection System - Complete Guide

## 🎤 Overview
Songbird AI now includes a complete AI singing voice system inspired by ACE Studio and Audimee, allowing users to:
- Select from 8 professional AI singing voices
- Blend multiple voices together
- Clone custom voices
- Apply AI vocals to generated music

---

## ✨ Features Implemented

### 1. **Voice Models Button**
- **Location**: Create page (`/create`), in the input controls area
- **Appearance**: Purple-pink gradient button with microphone icon
- **Opens**: Full-screen modal with voice collection

### 2. **Voice Model Collection Modal**
Contains 3 tabs:

#### Tab 1: Select Voice
- Grid of 8 AI singing voices with photos
- Each voice includes:
  - Name (Noah, Hailey, Josh, Blake, Nicole, Mark, Amina, Ava)
  - Gender (Male/Female)
  - Style (Pop, RnB, Rock, Jazz, etc.)
  - Vocal Range (Tenor, Soprano, Baritone, Alto, Mezzo-Soprano)
- Click to select a voice
- Selected voice shows purple ring and checkmark

#### Tab 2: Blend Voices
- Select up to 3 voices to blend together
- Create hybrid voices by mixing characteristics
- Blend strength slider (0-100%)
- Selected voices show pink ring and checkmark
- Real-time preview of selected voices

#### Tab 3: Clone Voice
- Upload your own voice samples
- Train custom AI voice model
- Requires 5-10 minutes of clean vocal recordings
- Coming soon feature

### 3. **Voice Selector Widget**
- **Location**: Below the music generation window
- **Appears when**: A voice or voice blend is selected
- **Shows**:
  - Selected voice with photo and details
  - OR Voice blend with all selected voices
  - Blend strength slider for blended voices
  - Close button to clear selection

---

## 🎨 Voice Models Available

| Name | Gender | Range | Style | Best For |
|------|--------|-------|-------|----------|
| Noah | Male | Tenor | Pop, RnB | Emotional ballads |
| Hailey | Female | Soprano | Dance, Pop, Belting | High-energy pop |
| Josh | Male | Baritone | Country, Rock | Americana, country |
| Blake | Male | Tenor | Rock, Gritty, Power | Rock anthems |
| Nicole | Female | Alto | Dance, Pop, RnB | Club tracks |
| Mark | Male | Tenor | Pop, Dance, Airy | Light pop songs |
| Amina | Female | Mezzo-Soprano | Jazz, RnB, Ethereal | Smooth jazz |
| Ava | Female | Soprano | Indie, Folk, Ethereal | Indie folk |

---

## 🔧 How It Works

### Single Voice Mode
1. Click "Voice Models" button
2. Go to "Select Voice" tab
3. Click on a voice to select it
4. Voice selector appears below input
5. Generate music - AI will sing with selected voice

### Voice Blending Mode
1. Click "Voice Models" button
2. Go to "Blend Voices" tab
3. Select 2-3 voices to blend
4. Adjust blend strength slider
5. Voice selector shows all blended voices
6. Generate music - AI creates hybrid voice

### Voice Cloning (Coming Soon)
1. Click "Voice Models" button
2. Go to "Clone Voice" tab
3. Upload 5-10 minutes of vocal samples
4. Wait for AI training
5. Use your custom voice for generation

---

## 💡 Use Cases

### For Producers
- Test different vocal styles quickly
- Create unique hybrid voices
- Match voice to genre automatically

### For Songwriters
- Hear lyrics sung before recording
- Experiment with male/female vocals
- Find the perfect voice for your song

### For Content Creators
- Generate vocals for videos/podcasts
- Create consistent brand voice
- Produce covers without singers

---

## 🎯 Technical Details

### Data Structure
```typescript
{
  id: "noah",
  name: "Noah",
  gender: "Male",
  style: "Pop, RnB",
  range: "Tenor",
  image: "https://..."
}
```

### State Management
- `selectedVoiceModel`: Single selected voice (string | null)
- `blendVoices`: Array of voice IDs for blending (string[])
- `voiceBlendStrength`: Slider value 0-100 (number)

### Integration Points
- **With Music Generation**: Voice applied during creation
- **With Database Upload**: Can use custom trained voices
- **With Random Prompts**: Auto-suggests matching voice

---

## 🚀 Future Enhancements

1. **Voice Preview**: Play sample audio for each voice
2. **Voice Training**: Complete voice cloning workflow
3. **Voice Marketplace**: Share/sell custom voices
4. **Advanced Blending**: Per-frequency voice mixing
5. **Voice Effects**: Add reverb, pitch shift, etc.
6. **Emotion Control**: Happy, sad, angry singing styles
7. **Language Support**: Multi-language singing voices
8. **Collaboration**: Share voice presets with team

---

## 📱 UI/UX Features

- **Purple/Pink Theme**: Distinguishes from orange database theme
- **Microphone Icon**: Clear voice/audio indication
- **Grid Layout**: Easy browsing of voice options
- **Real-time Preview**: See selections immediately
- **Smooth Animations**: Fade-in, scale, ring effects
- **Responsive Design**: Works on mobile/tablet/desktop
- **Keyboard Accessible**: Tab navigation support

---

## 🎨 Design Inspiration

### From ACE Studio
- Voice Mix concept (blending voices)
- Pre-made voice library
- MIDI to vocal conversion
- Custom voice training

### From Audimee
- Convert vocals with AI voices
- Featured royalty-free voices
- Train your own voices
- Voice style categorization

---

## 🔗 Navigation Flow

```
Create Page
  ↓
Click "Voice Models" Button
  ↓
Modal Opens with 3 Tabs
  ├─ Select Voice → Choose 1 voice
  ├─ Blend Voices → Choose 2-3 voices + adjust strength
  └─ Clone Voice → Upload samples (coming soon)
  ↓
Voice Selector Appears Below Input
  ↓
Click "Create" to Generate Music with Voice
```

---

## 🎵 Complete Workflow Example

1. User enters prompt: "upbeat pop song about summer"
2. Clicks dice to randomize → "energetic house track at 128 BPM"
3. Clicks "Voice Models" button
4. Selects "Hailey" (Female, Soprano, Dance/Pop)
5. Voice selector shows Hailey's card below input
6. Clicks "Create"
7. AI generates house track sung by Hailey AI voice

---

**Status**: ✅ Fully implemented and working!
**Version**: 27
**Last Updated**: March 22, 2026
